open Template

let () =
  Dream.run 
    @@ Dream.logger 
    @@ Dream.router [
      Dream.get "/public/**" @@ Dream.static "public";
      Dream.get "/" (fun _ ->
        Dream.html home);
    ]
