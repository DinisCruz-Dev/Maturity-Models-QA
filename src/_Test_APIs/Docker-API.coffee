class Docker_API

  constructor: (options)->
    @.options = options || {}
    @.port    = @.options.port || 3000

  server_Url: ()=>
    if @.using_Docker_Machine()
      'http://192.168.99.100:3000'
    else
      'http://127.0.0.1:3000'

  using_Docker_Machine: ->
    docker_Files =  process.env.HOME.path_Combine('.docker/machine/machines/default')
    return docker_Files.folder_Exists()

module.exports = Docker_API