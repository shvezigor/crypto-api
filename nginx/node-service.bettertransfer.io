server {
        listen       80;
	listen       443 ssl;
        server_name  node-service.eexwallet.eu;

        location / {
            proxy_pass http://localhost:3030;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
	}

  #ssl_certificate /etc/nginx/certs/id.eexwallet.eu.crt;
  #ssl_certificate_key /etc/nginx/certs/id.eexwallet.eu.key;

}

