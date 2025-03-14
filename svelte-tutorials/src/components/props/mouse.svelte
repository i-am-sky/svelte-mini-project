<script>
  let { coords = $bindable() } = $props();

  function updateMouseCoords(event) {
    // alert("")
    coords = { x: event.clientX, y: event.clientY };
    // console.log('Updated coords:', coords);
  }
</script>

<svelte:window on:mousemove={updateMouseCoords} />