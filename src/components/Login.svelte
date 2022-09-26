<script>
  import { onMount } from 'svelte';
  import { navigate } from 'svelte-routing';
  import { supabase } from '../supabaseClient';
  import { loginState } from '../store';

  let email;
  let password;
  let confirmPassword;
  let isLogin = true;
  let loader = false;
  let errorAlert = null;

  onMount(async () => {
    // const { data, error } = await supabase.from('Tracks').select();
    // console.log(data);
  });

  const changeLogin = () => {
    isLogin = !isLogin;
    email = '';
    password = '';
    confirmPassword = '';
  };

  const continueLogin = () => {
    loader = true;
    if (isLogin) {
      login();
    } else {
      signup();
    }
  };
  const login = async () => {
    const { user, error } = await supabase.auth.signIn({
      email,
      password,
    });
    loader = false;
    if (error) {
      errorAlert = error.message;
    } else {
      navigate('/home', { replace: true });
      loginState.set(true);
    }
  };

  const signup = async () => {
    if (password !== confirmPassword) {
      errorAlert = 'Password and confirm password should be same';
      return;
    }

    const { user, session, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    loader = false;
    if (error) {
      errorAlert = error.message;
    } else {
      navigate('/home', { replace: true });
      loginState.set(true);
    }
  };
</script>

<div>
  <div
    class="container d-flex flex-column justify-content-center align-items-center pt-5"
  >
    <div class="mb-3 w-70 w-md-35">
      <input
        type="email"
        bind:value={email}
        class="form-control"
        id="email"
        placeholder="Email"
        aria-describedby="emailHelp"
      />
      <input
        type="password"
        bind:value={password}
        class="form-control mt-3"
        id="password"
        placeholder="Password"
        aria-describedby="passwordHelp"
      />
      {#if !isLogin}
        <input
          type="password"
          bind:value={confirmPassword}
          class="form-control mt-3"
          id="confirmPassword"
          placeholder="Confirm Password"
          aria-describedby="confirmPasswordHelp"
        />
      {/if}
    </div>
    <div class="mb-3  w-70 w-md-35">
      {#if !loader}
        <button
          type="button"
          class="btn btn-primary w-100"
          on:click={continueLogin}>{isLogin ? 'Login' : 'Signup'}</button
        >
      {:else}
        <button class="btn btn-primary w-100" type="button" disabled>
          <span
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          />
          {isLogin ? 'Logging in...' : 'Signing up...'}
        </button>
      {/if}
      <div class="mt-2">
        {#if !isLogin}
          <p class="text-primary pointer" on:click={changeLogin}>
            Already have an account? login
          </p>
        {:else}
          <p class="text-primary pointer" on:click={changeLogin}>
            Create new account
          </p>
        {/if}
      </div>
      <div class="mt-2">
        {#if errorAlert}
          <div class="alert alert-danger" role="alert">
            {errorAlert}
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  .pointer {
    cursor: pointer;
  }
</style>
