<script lang="ts">
  import { fly } from "svelte/transition";

  let formState = $state({
    answers: {},
    step: 0,
    error: "",
  });

  let QUESTIONS = [
    {
      question: "What's your name?",
      id: "name",
      type: "text",
    },
    {
      question: "When were you born?",
      id: "birthday",
      type: "date",
    },
    {
      question: "what's your favourite color?",
      id: "color",
      type: "color",
    },
  ];

  function nextStep(id: string) {
    if (formState.answers[id]) {
      formState.step++;
      formState.error = "";
    } else {
      formState.error = `Please answer the question "${id}"`;
    }
  }
</script>

<main>
  <h1>{formState.answers.name ? formState.answers.name : "User"}'s form</h1>
  <p>Step: {formState.step}</p>

  {#each QUESTIONS as { question, type, id }, index (id)}
    {#if formState.step == index}
      <div
        in:fly={{ x: 200, duration: 200, opacity: 0, delay: 200 }}
        out:fly={{ x: -200, duration: 200, opacity: 0 }}
      >
        {@render formStep({ question, type, id })}
      </div>
    {/if}
  {/each}

  {#if formState.error}
    <p>Error: {formState.error}</p>
  {/if}
</main>

{#snippet formStep({
  type,
  question,
  id,
}: {
  type: string;
  question: string;
  id: string;
})}
  <article>
    <div>
      <label for={id}>{question}</label>
      <input {type} {id} bind:value={formState.answers[id]} />
    </div>
    <button onclick={() => nextStep(id)}>Next</button>
  </article>
{/snippet}
