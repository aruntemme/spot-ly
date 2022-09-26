<script>
  import { navigate } from 'svelte-routing';
  import { onMount } from 'svelte';
  import { supabase } from '../supabaseClient';

  let email;
  let trackUrl;
  let allTracks = [];

  onMount(async () => {
    const user = await supabase.auth.user();
    email = user.email;
    getTracks();
  });

  const addTrack = async () => {
    // verify if trackUrl is spotify url
    if (!trackUrl.includes('open.spotify.com')) {
      alert('Please enter a valid spotify url');
      return;
    }
    const { data, error } = await supabase.from('Tracks').insert([
      {
        email: email,
        track_url: trackUrl,
      },
    ]);
    if (error) {
      console.log('error', error);
    } else {
      console.log('data', data);
    }
  };

  const getTracks = async () => {
    const { data, error } = await supabase.from('Tracks').select();
    if (error) {
      console.log('error', error);
    } else {
      console.log('data', data);
      allTracks = data;
    }
  };

  const deleteTrack = async (id) => {
    const { data, error } = await supabase
      .from('Tracks')
      .delete()
      .match({ id });
    if (error) {
      console.log('error', error);
    } else {
      console.log('data', data);
      getTracks();
    }
  };
</script>

<div>
  <div
    class="container d-flex flex-column justify-content-center align-items-center pt-5"
  >
    <div class="mb-3  w-70 w-md-35">
      <input
        type="text"
        class="form-control"
        bind:value={trackUrl}
        placeholder="Enter track name"
      />
      <button
        type="button"
        class="btn btn-outline-primary mt-2 w-100"
        on:click={addTrack}
      >
        Add
      </button>
    </div>
    <!-- list all tracks in loop cards with delete button -->
    {#each allTracks as track}
      <div class="card mb-3 w-70 w-md-35">
        <div class="card-body">
          <h5 class="card-title">{track.track_url}</h5>
          <button
            type="button"
            class="btn btn-outline-danger"
            on:click={() => deleteTrack(track.id)}
          >
            Delete
          </button>
        </div>
      </div>
    {/each}
  </div>
</div>
