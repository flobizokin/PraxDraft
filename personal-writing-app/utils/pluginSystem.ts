type PluginFunction = (context: any) => void

interface Plugin {
  name: string
  version: string
  description: string
  initialize: PluginFunction
}

class PluginManager {
  private plugins: Map<string, Plugin> = new Map()

  installPlugin(plugin: Plugin) {
    if (this.plugins.has(plugin.name)) {
      console.warn(`Plugin ${plugin.name} is already installed. Skipping.`)
      return
    }
    this.plugins.set(plugin.name, plugin)
    plugin.initialize(this.getPluginContext())
  }

  uninstallPlugin(pluginName: string) {
    if (!this.plugins.has(pluginName)) {
      console.warn(`Plugin ${pluginName} is not installed.`)
      return
    }
    this.plugins.delete(pluginName)
  }

  getPlugin(pluginName: string): Plugin | undefined {
    return this.plugins.get(pluginName)
  }

  private getPluginContext() {
    // Return a context object that plugins can use
    return {
      // Add methods and properties that plugins can access
    }
  }
}

export const pluginManager = new PluginManager()

// Example plugin
export const examplePlugin: Plugin = {
  name: 'ExamplePlugin',
  version: '1.0.0',
  description: 'An example plugin',
  initialize: (context) => {
    console.log('Example plugin initialized')
    // Plugin logic here
  }
}

