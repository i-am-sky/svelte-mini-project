<script>
  import { onMount } from "svelte";
  import Button from "./button.svelte";
  import Card from "./card.svelte";

  let currentPage = $state(1);
  let posts = $state([]);
  let CurrentIndex = $state(0);
  let isNextDisabled = $state(false);
  let isPrevDisabled = $state(true);

  const fetchData = async (page) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`
      );
      const data = await response.json();
      posts = [...posts, ...data];
      updateButtonState();
    } catch (err) {
      console.log("Error occured: ", err);
    }
  };

  onMount(() => {
    fetchData(currentPage);
    $inspect(posts);
  });

  const updateButtonState = () => {
    isPrevDisabled = CurrentIndex <= 0;
    isNextDisabled = CurrentIndex > posts.length - 1;
  };

  const clickNext = () => {
    console.log(CurrentIndex + " => ");
    if (CurrentIndex <= posts.length - 1) {
      CurrentIndex++;
      updateButtonState();
    }
    if (CurrentIndex >= posts.length) {
      currentPage++;
      fetchData(currentPage);
      CurrentIndex = posts.length;
    }
    console.log(CurrentIndex);
  };

  const clickPrev = () => {
    if (CurrentIndex > 0) {
      CurrentIndex--;
      updateButtonState();
    }
  };
</script>

<main>
  <div class="container">
    {#if posts.length > 0}
      <Card cardItem={posts[CurrentIndex]} />
      <div class="btn-container">
        <Button
          text="◀"
          onclick={clickPrev}
          disabled={isPrevDisabled}
          title="Previous"
        />
        <Button
          text="▶"
          onclick={clickNext}
          disabled={isNextDisabled}
          title="Next"
        />
      </div>
    {:else}
      <p>Loading posts...</p>
    {/if}
  </div>
</main>

<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: canter;
    flex-direction: column;
    gap: 2rem;
  }

  .btn-container {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 2rem;
  }
</style>
