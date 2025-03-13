<script>

  let questions = $state([
    {
      id: 1,
      text: "this is a sample question one",
    },
    {
      id: 2,
      text: "this is a sample question two",
    },
    {
      id: 3,
      text: "this is a sample question three",
    },
  ]);

  let selected = $state();
  let answer = $state('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
        `answered question ${selected.id} and ${selected.text} with ${answer}`
    )
  }

</script>

<form onsubmit={handleSubmit}>
  <select bind:value={selected} onchange={() => (answer = "")}>
    {#each questions as question}
      <option value={question}>{question.text}</option>
    {/each}
  </select>

  <input type="text" bind:value={answer}>

  <input type="submit" disabled={!answer}>
</form>
