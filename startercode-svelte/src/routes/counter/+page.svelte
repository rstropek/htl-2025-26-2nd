<script lang="ts">
    let count = $state(0);

    function increment() {
        count++;
    }

    function decrement() {
        count--;
    }
</script>

<h1>Counter</h1>

<p>Count: {count}</p>

<button type="button" onclick={increment}>Increment</button>
<button type="button" onclick={decrement}>Decrement</button>
