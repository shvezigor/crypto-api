module.exports = {
    apps : [{
        name   : "web-server-crypto",
        script : "./server.js",
        instances: 1,
        watch: true,
        max_memory_restart: '100M',
        out_file:  "/dev/null",
    }
    ]
}