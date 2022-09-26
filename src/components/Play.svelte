<script>
  import { navigate } from 'svelte-routing';
  import { onMount } from 'svelte';
  import { supabase } from '../supabaseClient';

  onMount(async () => {});

  const albumListsIds = [
    '6R0FwF48PO2BrdZpLeWi42',
    '0r1ppERo8Mp5iKg3lANvnB',
    '58UL0Wq1AOKkwEaLTTGMxa',
  ];
  let trackId = albumListsIds[0];

  const shuffleTracks = () => {
    trackId = albumListsIds[Math.floor(Math.random() * albumListsIds.length)];
  };
</script>

<div>
  <div
    class="container d-flex flex-column justify-content-center align-items-center pt-5"
  >
    <div class="mb-3  w-70 w-md-35">
      <img
        src="https://scannables.scdn.co/uri/plain/png/000000/white/640/spotify:track:{trackId}"
        class="img-fluid"
        alt="Spotify"
      />

      <button
        type="button"
        class="btn btn-outline-primary mt-2 w-100"
        on:click={shuffleTracks}
      >
        Shuffle
      </button>
    </div>
  </div>
</div>
