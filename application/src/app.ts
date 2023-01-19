import createConfig from './config/createConfig.js'
import runServer from './express/runServer.js'
const config = createConfig()

await runServer(config)
