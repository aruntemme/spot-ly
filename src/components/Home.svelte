<script>
  import { navigate } from 'svelte-routing';
  import { onMount } from 'svelte';
  import { supabase, checkLoggedIn, userEmail } from '../supabaseClient';

  let partnerEmail;
  let currentEmail;

  onMount(async () => {
    currentEmail = await userEmail();
  });

  const sendPartnerRequest = async () => {
    // check if partner email is already in the Partner table with current user email
    // const { data, error } = await supabase
    //   .from('Partner')
    //   .select()
    //   .match({ partner_email: partnerEmail, email: currentEmail });
    const { data, error } = await supabase.from('Requests').insert([
      {
        requester: currentEmail,
        requestee: partnerEmail,
        status: 'pending',
      },
    ]);
    if (error) {
      console.log('error', error);
    } else {
      console.log('data', data);
    }
  };
</script>

<div>
  <div
    class="container d-flex flex-column justify-content-center align-items-center pt-5"
  >
    <div>
      <!-- connect with your partner -->
      <div>
        <h1 class="text-center">Connect with your partner</h1>
        <div class="d-flex justify-content-center">
          <input
            type="text"
            class="form-control"
            bind:value={partnerEmail}
            placeholder="Partner's email"
          />
          <button class="btn btn-primary">Connect</button>
        </div>
      </div>
    </div>
    <div class="mb-3  w-70 w-md-35 d-flex flex-row">
      <div
        class="add home__container"
        on:click={() => {
          navigate('/add');
        }}
      >
        <span>Add</span>
      </div>
      <div
        class="play home__container"
        on:click={() => {
          navigate('/play');
        }}
      >
        <span>Play</span>
      </div>
    </div>
  </div>
</div>

<style>
  .add {
    background-color: blueviolet;
  }
  .play {
    background-color: aqua;
  }

  .home__container {
    width: 50%;
    border: 2px solid #000;
    padding: 10px;
    margin: 5px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .home__container span {
    font-size: 20px;
    font-weight: 600;
  }
</style>
