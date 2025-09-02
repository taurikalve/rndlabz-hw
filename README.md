# Test assignment

## How to run

### Setup

Add CoinMarketCap API (`CMC_API_KEY`) key in the `backend` dir to a `.env` file.

### Command

Run with `docker-compose up`.

#### Possible conflicts

Apps are configured to utilzie ports `3000` and `3001` on the host machine.

## Backend reasoning

I went with Fastify, because it's the most performant and due to personal proficiency, because it's the framework I'm the most familiar with.

## Future enhancements

- Add support for more coins via wildcard route, improve price getter abstraction for more dynamic behaviour
- Canonical cache key matching, calculating reverse pricing
- Improve security (ie add DB user/password, set up CORS properly, JSON schemas)
- Add DB consistency via volume
- Create DB indexes
- Utilize Fastify onSend hook for updating price
- Implement SSG for SvelteKit
- Implement token names, slugs
- Implement coin search
- Improve API query failing
- Implement available coin fetching from the backend
- Implement tick interval for updating price data on the frontend
- Add a homepage
