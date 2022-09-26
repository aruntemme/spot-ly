<script>
  import Home from './Home.svelte';
  import Login from './Login.svelte';
  import Add from './Add.svelte';
  import Play from './Play.svelte';
  import { Router, Link, Route, navigate } from 'svelte-routing';
  export let url = '';
  import { supabase, checkLoggedIn } from '../supabaseClient';
  import { loginState } from '../store';
  import { onMount } from 'svelte';

  const logout = async () => {
    await supabase.auth.signOut();
    loginState.set(false);
    navigate('/login');
  };

  let isLogged;

  loginState.subscribe((value) => {
    isLogged = value;
  });

  onMount(async () => {
    const user = await checkLoggedIn();
    if (user) {
      loginState.set(true);
      navigate('/home');
    } else {
      loginState.set(false);
      navigate('/login');
    }
  });
</script>

<Router {url}>
  <nav
    class="navbar navbar-light justify-content-between px-3"
    style="background-color: #e3f2fd;"
  >
    <Link class="navbar-brand" to="/home">Spot-ly</Link>
    {#if isLogged}
      <button
        class="btn btn-outline-danger my-2 my-sm-0"
        type="button"
        on:click={logout}>Logout</button
      >
    {/if}
  </nav>
  <Route path="/home" component={Home} />
  <Route path="/login" component={Login} />
  <Route path="/add" component={Add} />
  <Route path="/play" component={Play} />
</Router>
