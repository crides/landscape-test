/+  *server, default-agent
::
|%
+$  state-ty  (map @t @t)
+$  card  card:agent:gall
--
=/  pokes=state-ty  *state-ty
^-  agent:gall
|_  bol=bowl:gall
+*  this       .
    test-core  +>
    cc         ~(. test-core bol)
    def        ~(. (default-agent this %|) bol)
::
++  on-init
  ^-  (quip card _this)
  =/  launcha  [%launch-action !>([%add %test [[%basic 'test' '/~test/img/tile.png' '/~test'] %.y]])]
  =/  filea  [%file-server-action !>([%serve-dir /'~test' /app/test %.n %.n])]
  :_  this
  :~  [%pass /srv %agent [our.bol %file-server] %poke filea]
      [%pass /test %agent [our.bol %launch] %poke launcha]
      ==
::
++  on-watch
  |=  =path
  ^-  (quip card _this)
  ?:  ?=([%http-response *] path)
    `this
  ~&  >  path=path
  ?.  =(/ path)
    (on-watch:def path)
  :: `this
  [[%give %fact ~ %json !>((json [%s 'event']))]~ this]
::
++  on-agent  on-agent:def
::
++  on-arvo
  |=  [=wire =sign-arvo]
  ^-  (quip card _this)
  |^
    ?:  ?=(%i -.sign-arvo)
      ?>  ?=(%http-response +<.sign-arvo)
      (handle-response -.wire client-response.sign-arvo)
    (on-arvo:def wire sign-arvo)
  ::
  ++  handle-response
    |=  [url=@ta resp=client-response:iris]
    ^-  (quip card _this)
    ?.  ?=(%finished -.resp)
      ~&  >>  -.resp
      `this
    ~&  >  "got data from {<url>}"
    =/  fetched=(unit json)  (de-json:html q.data:(need full-file.resp))
    ?~  fetched
      ~&  >>>  'Not found'
      :_  this
      ~[[%give %fact ~[/poke-primary] %json !>((json [%s 'Not found']))]]
    =,  dejs:format
    =/  info
      %.  u.fetched  %-  ot
      :~
        ['name' so]
        ['sprites' (ot ~[['front_default' so]])]
      ==
    ~&  >>  info+info
    =.  pokes  (~(put by pokes) -.info +.info)
    :_  this
    :~
      [%give %fact ~[/poke-primary] %json !>((json [%s +.info]))]
    ==
  --
::
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  =/  val  !<(json vase)
  =/  name=cord  (so:dejs:format val)
  =/  info  (~(get by pokes) name)
  ~&  >  info+info
  ?^  info
    :_  this
    ~[[%give %fact ~[/poke-primary] %json !>((json [%s u.info]))]]
  =/  url  (crip "https://pokeapi.co/api/v2/pokemon/{(trip name)}")
  :_  this
  :~
    ^-  card:agent:gall
    [%pass /[url] %arvo %i `task:able:iris`[%request `request:http`[%'GET' url ~ ~] *outbound-config:iris]]
  ==
++  on-save  on-save:def
++  on-load  on-load:def
++  on-leave  on-leave:def
++  on-peek   on-peek:def
++  on-fail   on-fail:def
--
