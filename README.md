# Test assignment

## How to run

### Setup

#### Backend

`.env` file:

- `CMC_API_KEY` - CoinMarketCap API key. **Mandatory!**
- `MONGO_URI` - not necessary for running with Docker

#### Frontend

`.env` file:

- `PUBLIC_API_URL` - setup for `http://localhost:3001`. **Mandatory!**

### Command

Run with `docker-compose up`.

#### Possible conflicts

Apps are configured to utilzie ports `3000` and `3001` on the host machine.
Locally meant to be run on POSIX-compliant hosts.

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
- Code and types sharing via a monorepo solution like npm workspaces
- Improve .env file management
