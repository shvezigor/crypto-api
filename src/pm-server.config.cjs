module.exports = {
    apps: [
        {
            name: "web-server-crypto",
            script: "./server.js",
            instances: 1,
            watch: true,
            max_memory_restart: '100M',
            out_file: "/dev/null",
            cron_restart: '0 * * * *',
        },
        {
            name: "web-server-crypto-new",
            script: "./server2.js",
            instances: 1,
            watch: true,
            max_memory_restart: '100M',
            out_file: "/dev/null",
            cron_restart: '0 * * * *',
        },
        {
            name: "cron-web-crypto",
            script: "./cron.js",
            instances: 1,
            watch: true,
            max_memory_restart: '100M',
            out_file: "/dev/null",
            cron_restart: '0 * * * *',
        }
    ]
}