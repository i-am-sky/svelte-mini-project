<script>
  let selectedData = $state("Plain");
</script>

{#each ["Plain", "Whole wheat", "Spinach"] as data}
  <label>
    <input type="radio" bind:group={selectedData} value={data} />
    {data}
  </label>
{/each}

<p>Selected tortilla: {selectedData}</p>
