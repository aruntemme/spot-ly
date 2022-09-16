<script>
    import You from './You.svelte';
    import { Router, Link, Route } from "svelte-routing";
    export let url = "";
</script>

<Router url="{url}">
    <nav class="navbar bg-light">
        <div class="container-fluid">
            <Link class="navbar-brand" to="/home">
                Spot-ly
            </Link>
        </div>
      </nav>
      <Route path="/you" component={You} />
</Router>