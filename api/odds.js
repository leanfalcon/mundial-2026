export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await fetch(
      'https://api.the-odds-api.com/v4/sports/soccer_fifa_world_cup/odds?' +
      'regions=eu,uk&markets=outrights&oddsFormat=decimal&apiKey=' +
      process.env.ODDS_API_KEY
    );

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Odds API error' });
    }

    const data = await response.json();

    // Extract World Cup winner outright odds and normalize
    const bookmakerMap = {};

    data.forEach(event => {
      event.bookmakers?.forEach(bk => {
        bk.markets?.forEach(market => {
          if (market.key === 'outrights') {
            market.outcomes?.forEach(outcome => {
              const team = outcome.name;
              if (!bookmakerMap[team]) bookmakerMap[team] = [];
              bookmakerMap[team].push({
                bookmaker: bk.title,
                decimal: outcome.price,
              });
            });
          }
        });
      });
    });

    // Calculate average implied probability per team
    const teams = Object.entries(bookmakerMap).map(([name, odds]) => {
      const avgImplied = odds.reduce((sum, o) => sum + (1 / o.price), 0) / odds.length * 100;
      // Get best (highest) price across bookmakers
      const best = odds.reduce((a, b) => a.decimal > b.decimal ? a : b);
      // Get William Hill, bet365, Betfair if available
      const wh = odds.find(o => o.bookmaker.toLowerCase().includes('william'));
      const b365 = odds.find(o => o.bookmaker.toLowerCase().includes('bet365'));
      const bf = odds.find(o => o.bookmaker.toLowerCase().includes('betfair'));
      return {
        name,
        pct: Math.round(avgImplied * 10) / 10,
        bestOdds: best.decimal,
        bestBook: best.bookmaker,
        wmHill: wh ? wh.decimal.toFixed(2) : null,
        bet365: b365 ? b365.decimal.toFixed(2) : null,
        betfair: bf ? bf.decimal.toFixed(2) : null,
        bookmakers: odds.length,
      };
    });

    // Sort by probability descending, take top 12
    const sorted = teams.sort((a, b) => b.pct - a.pct).slice(0, 12);

    // Headers info
    const remaining = response.headers.get('x-requests-remaining');
    const used = response.headers.get('x-requests-used');

    res.status(200).json({
      teams: sorted,
      meta: { remaining, used, updated: new Date().toISOString() }
    });

  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch odds', detail: error.message });
  }
}
