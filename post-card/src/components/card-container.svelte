<script lang="ts">
  import { onMount } from "svelte";
  import Button from "./button.svelte";
  import Card from "./card.svelte";

  type Post = {
    id: number;
    title: string;
    body: string;
  };

  let isPrevDisabled: boolean = $state(true);
  let isNextDisabled: boolean = $state(false);

  let currentIndex: number = $state(0);
  let posts: Post[] = $state([]);

  const fetchData = async (): Promise<void> => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=5`
      );
      posts = await response.json();
    } catch (err) {
      console.log("Error occured: ", err);
    }
  };

  onMount((): void => {
    fetchData();
  });

  $inspect(posts[currentIndex]);

  const updateButtonState = (): void => {
    isPrevDisabled = currentIndex <= 0;
    isNextDisabled = currentIndex >= posts.length - 1;
  };

  const onPrevClick = (): void => {
    if (currentIndex > 0) {
      currentIndex--;
      updateButtonState();
    }
  };

  const onNextClick = (): void => {
    if (currentIndex < posts.length - 1) {
      currentIndex++;
      updateButtonState();
    }
  };
</script>

<div class="card-container">
  {#if posts.length > 0}
    <Card cardItem={posts[currentIndex]} />
    <div class="btn-container">
      <Button
        text={"◀"}
        onclick={onPrevClick}
        disabled={isPrevDisabled}
        title={"Previous"}
      />
      <Button
        text={"▶"}
        onclick={onNextClick}
        disabled={isNextDisabled}
        title={"Next"}
      />
    </div>
  {/if}
</div>

<style>
  .card-container {
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
