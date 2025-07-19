import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'your-project-id', // replace with your project id
    dataset: 'production' // replace with your dataset name
  }
})
