# Souin desktop

This app helps people to manage their Souin (https://github.com/darkweak/souin) instances using a GUI.  
Actually you can add your own instances, manage the stored keys and the Surrogate-Keys (groups).

## Stack
### Frontend
* Classic React app
* Wouter as react router
* React-query to send HTTP requests to the API

### Backend
* Wails go app

## Example
### Caddy configuration
You can refer to the Caddyfile in the directory `testdata`.
```
{
    debug
    cache {
        api {
            souin
        }

        cdn {
            strategy hard
        }
        ttl 3600s
    }
}

(cors) {
	@cors_preflight method OPTIONS

	header {
		Access-Control-Allow-Origin "{header.origin}"
        Access-Control-Allow-Headers *
	}

	handle @cors_preflight {
		header {
			Access-Control-Allow-Methods "GET, PURGE, OPTIONS"
		}
		respond "" 204
	}
}

:80 {
	import cors {header.origin}

    route {
        cache
        header {
            Access-Control-Allow-Origin *
            Access-Control-Allow-Methods *
            Access-Control-Allow-Headers *
        }

        respond "Hello"
    }
}
```

### Application configuration
In the `Create instance` view, you can fill the following fields:
* `Name`: anything you want.
* `URL`: The URL to the API (e.g. `http://localhost/souin-api/souin` using the caddyfile above).
