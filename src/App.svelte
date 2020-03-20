<script>
  import Emoji from "./Components/Emoji.svelte";
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  <h1>Hello!</h1>
  <p>
    Checking to see if this
    <Emoji label="paint brush" symbol="🖌" />
    works or not.
  </p>
  <p>
    What about this one?
    <Emoji label="" symbol="🍎" />
  </p>
</main>
