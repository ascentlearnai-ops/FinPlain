import type { GlossaryTerm } from './types'

export const glossaryTerms: GlossaryTerm[] = [
  {
    id: 'stock', term: 'Stock', category: 'stocks', emoji: '',
    definition: 'A small piece of ownership in a company. When you buy a stock, you own a tiny slice of that business.',
    example: 'If a pizza is a company, buying a stock is like buying one slice.',
  },
  {
    id: 'share', term: 'Share', category: 'stocks', emoji: '',
    definition: 'One unit of stock. When a company splits ownership into pieces, each piece is called a share.',
    example: 'One piece in a puzzle. The whole puzzle is the company.',
  },
  {
    id: 'dividend', term: 'Dividend', category: 'stocks', emoji: '',
    definition: 'Money a company pays to stockholders just for owning their stock, usually every 3 months.',
    example: 'A landlord paying you rent because you own part of the building.',
  },
  {
    id: 'market-cap', term: 'Market Cap', category: 'numbers', emoji: '',
    definition: 'The total dollar value of all a company\'s shares combined — basically its price tag.',
    example: 'The sticker price on the entire company, not just one share.',
  },
  {
    id: 'pe-ratio', term: 'P/E Ratio', category: 'numbers', emoji: '',
    definition: 'Price-to-Earnings ratio — how much investors pay for every $1 a company earns. High P/E means high expectations.',
    example: 'Paying $30 for a lemonade stand that earns $1/day — P/E of 30.',
  },
  {
    id: 'bull-market', term: 'Bull Market', category: 'markets', emoji: '',
    definition: 'When stock prices are going up for a long time and investors feel confident.',
    example: 'A bull thrusts its horns UP — prices going up.',
  },
  {
    id: 'bear-market', term: 'Bear Market', category: 'markets', emoji: '',
    definition: 'When stock prices fall 20% or more from recent highs and investors feel scared.',
    example: 'A bear swipes its claws DOWN — prices going down.',
  },
  {
    id: 'ipo', term: 'IPO', category: 'stocks', emoji: '',
    definition: 'Initial Public Offering — the first time a private company sells its stock to regular people on the stock market.',
    example: 'A restaurant that was family-only opening its doors to the public for the first time.',
  },
  {
    id: 'index', term: 'Index', category: 'markets', emoji: '',
    definition: 'A measurement that tracks a group of stocks together to show how the overall market is doing.',
    example: 'A class average — instead of one student\'s grade, it shows how the whole class did.',
  },
  {
    id: 'etf', term: 'ETF', category: 'basics', emoji: '',
    definition: 'Exchange-Traded Fund — a bundle of many stocks that you can buy as if it were one stock.',
    example: 'Buying a variety pack of chips instead of picking one flavor.',
  },
  {
    id: 'portfolio', term: 'Portfolio', category: 'basics', emoji: '',
    definition: 'All the investments a person owns put together — their collection of stocks, ETFs, and other assets.',
    example: 'Your investment backpack. Everything you own is inside it.',
  },
  {
    id: 'broker', term: 'Broker', category: 'basics', emoji: '',
    definition: 'A platform or person that lets you buy and sell stocks. Apps like Robinhood or Fidelity are brokers.',
    example: 'A middleman at a farmers market who handles your transactions.',
  },
  {
    id: 'volume', term: 'Volume', category: 'numbers', emoji: '',
    definition: 'The number of shares bought and sold in a given day. High volume means lots of trading activity.',
    example: 'Foot traffic in a store. High volume = packed. Low volume = empty.',
  },
  {
    id: 'volatility', term: 'Volatility', category: 'numbers', emoji: '',
    definition: 'How much a stock\'s price jumps around. High volatility = big swings up and down. Low volatility = steady.',
    example: 'A rollercoaster (high volatility) vs. an escalator (low volatility).',
  },
  {
    id: '52wk-high', term: '52-Week High', category: 'numbers', emoji: '',
    definition: 'The highest price a stock has reached in the last 12 months.',
    example: 'The highest point on a hike over the past year.',
  },
  {
    id: '52wk-low', term: '52-Week Low', category: 'numbers', emoji: '',
    definition: 'The lowest price a stock has reached in the last 12 months.',
    example: 'The lowest valley on that same hike.',
  },
  {
    id: 'earnings', term: 'Earnings', category: 'numbers', emoji: '',
    definition: 'How much profit a company made in a set period (usually 3 months). Companies report earnings 4 times a year.',
    example: 'A report card for the company\'s money — did it make more than it spent?',
  },
  {
    id: 'revenue', term: 'Revenue', category: 'numbers', emoji: '',
    definition: 'The total amount of money a company brings in from selling its products or services, before paying any expenses.',
    example: 'All the money your lemonade stand collected — before buying more lemons.',
  },
  {
    id: 'profit', term: 'Profit', category: 'numbers', emoji: '',
    definition: 'What\'s left after a company pays all its bills. Revenue minus expenses equals profit.',
    example: 'What you actually keep from the lemonade stand after buying supplies.',
  },
  {
    id: 'inflation', term: 'Inflation', category: 'markets', emoji: '',
    definition: 'When prices of things (food, gas, rent) rise over time, which means your money buys less.',
    example: 'A $1 candy bar slowly costing $1.25 a few years later.',
  },
  {
    id: 'interest-rate', term: 'Interest Rate', category: 'markets', emoji: '',
    definition: 'The percentage the government charges banks to borrow money. It affects everything from loans to the stock market.',
    example: 'The price of borrowing money. High rates = expensive loans = people spend less.',
  },
  {
    id: 'sp500', term: 'S&P 500', category: 'markets', emoji: '',
    definition: 'A list of the 500 biggest US companies by market cap. It\'s the most watched stock index in the world.',
    example: 'The top 500 players in the US business league.',
  },
  {
    id: 'nasdaq', term: 'Nasdaq', category: 'markets', emoji: '',
    definition: 'A stock exchange known for tech companies. The Nasdaq Composite tracks over 3,000 stocks listed there.',
    example: 'The tech school of stock exchanges — Apple, Google, and Meta all live here.',
  },
  {
    id: 'dow', term: 'Dow Jones', category: 'markets', emoji: '',
    definition: 'An index tracking 30 of the most important US companies. One of the oldest stock market measures.',
    example: 'The Hall of Fame for US companies — only the most established get in.',
  },
  {
    id: 'blue-chip', term: 'Blue Chip Stock', category: 'stocks', emoji: '',
    definition: 'Stock of a very large, stable, well-known company that has been around for a long time.',
    example: 'In poker, blue chips are worth the most. Blue chip stocks are the safest, most valuable companies.',
  },
  {
    id: 'penny-stock', term: 'Penny Stock', category: 'stocks', emoji: '',
    definition: 'A very cheap stock (usually under $5) from a small or struggling company. Very risky.',
    example: 'Buying a ticket to an unknown band. Could blow up — or might just be bad.',
  },
  {
    id: 'short-selling', term: 'Short Selling', category: 'basics', emoji: '',
    definition: 'Borrowing a stock and selling it, hoping the price drops so you can buy it back cheaper and keep the difference.',
    example: 'Borrowing sneakers, selling for $100, buying back at $60, and pocketing $40.',
  },
  {
    id: 'options', term: 'Options', category: 'basics', emoji: '',
    definition: 'A contract giving you the right to buy or sell a stock at a set price before a certain date. High risk.',
    example: 'A coupon that lets you buy something at yesterday\'s price, even if it costs more today.',
  },
  {
    id: 'bonds', term: 'Bonds', category: 'basics', emoji: '',
    definition: 'When you lend money to a company or government, they give you a bond — a promise to pay you back with interest.',
    example: 'Giving your friend $100 and they promise to pay you back $110 in a year.',
  },
  {
    id: 'yield', term: 'Yield', category: 'numbers', emoji: '',
    definition: 'How much income an investment produces per year, shown as a percentage.',
    example: 'How much your investment "harvests" each year — like crop yield on a farm.',
  },
  {
    id: 'bid-ask', term: 'Bid & Ask', category: 'markets', emoji: '',
    definition: 'The bid is the highest price a buyer will pay. The ask is the lowest price a seller will accept. Trades happen when they match.',
    example: 'Haggling at a garage sale. Buyer offers $5 (bid), seller wants $7 (ask).',
  },
  {
    id: 'diversification', term: 'Diversification', category: 'basics', emoji: '',
    definition: 'Spreading investments across many different stocks or assets so one bad investment doesn\'t wipe you out.',
    example: 'Not putting all your eggs in one basket.',
  },
  {
    id: 'sector', term: 'Sector', category: 'markets', emoji: '',
    definition: 'A group of companies that do similar things. Examples: Technology, Healthcare, Energy, Finance.',
    example: 'Different departments in a mall — tech is the electronics store, healthcare is the pharmacy.',
  },
  {
    id: 'recession', term: 'Recession', category: 'markets', emoji: '',
    definition: 'When the economy shrinks for at least two quarters (6 months) in a row. Usually comes with more unemployment.',
    example: 'The whole economy catching a cold — fewer jobs, less spending, slower growth.',
  },
  {
    id: 'bull-run', term: 'Bull Run', category: 'markets', emoji: '',
    definition: 'An extended period where stock prices keep rising, often driven by investor excitement.',
    example: 'A hot streak in sports — everything is clicking and going up.',
  },
  {
    id: 'correction', term: 'Market Correction', category: 'markets', emoji: '',
    definition: 'When stock prices drop 10-20% from a recent high. It\'s normal and happens regularly.',
    example: 'A balloon that got too big letting out a little air — not popping, just adjusting.',
  },
  {
    id: 'roe', term: 'ROE', category: 'numbers', emoji: '',
    definition: 'Return on Equity — how efficiently a company uses shareholder money to make profit. Higher is better.',
    example: 'How much profit a business squeezes from every dollar investors gave it.',
  },
  {
    id: 'eps', term: 'EPS', category: 'numbers', emoji: '',
    definition: 'Earnings Per Share — how much profit the company made divided by the number of shares. Higher EPS = more profitable.',
    example: 'Splitting a pizza. EPS shows your slice size — how much profit each share "owns."',
  },
  {
    id: 'day-trading', term: 'Day Trading', category: 'basics', emoji: '',
    definition: 'Buying and selling stocks within the same day to profit from short-term price moves. Very risky.',
    example: 'Flipping sneakers in one day — buy in the morning, sell in the afternoon.',
  },
  {
    id: 'candlestick', term: 'Candlestick Chart', category: 'basics', emoji: '',
    definition: 'A type of chart that shows the open, high, low, and close price of a stock for each time period.',
    example: 'A scorecard for each moment — where the stock started, how high it went, how low, and where it ended.',
  },
]
