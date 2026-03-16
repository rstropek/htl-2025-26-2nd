<script lang="ts">
	let duration = $state(60);
	let timeLeft = $state(60);
	let isRunning = $state(false);
	let intervalId: number | undefined = $state(undefined);

	function start() {
		if (isRunning) return;
		
		isRunning = true;
		timeLeft = duration;
		
		intervalId = window.setInterval(() => {
			timeLeft--;
			if (timeLeft <= 0) {
				stop();
			}
		}, 1000);
	}

	function stop() {
		isRunning = false;
		if (intervalId !== undefined) {
			clearInterval(intervalId);
			intervalId = undefined;
		}
	}

	function handleDurationChange(event: Event) {
		const target = event.target as HTMLInputElement;
		duration = parseInt(target.value);
		if (!isRunning) {
			timeLeft = duration;
		}
	}

	// Calculate progress percentage (0 to 1)
	$effect(() => {
		const progress = duration > 0 ? timeLeft / duration : 0;
		// Update CSS custom property for the progress circle
		const circle = document.querySelector('.progress-circle') as HTMLElement;
		if (circle) {
			circle.style.setProperty('--progress', progress.toString());
		}
	});
</script>

<div class="stopwatch-container">
	<div class="duration-control">
		<label for="duration-slider">Set Duration (0-100s)</label>
		<span class="duration-value">{duration} s</span>
	</div>
	
	<input
		id="duration-slider"
		type="range"
		min="0"
		max="100"
		value={duration}
		oninput={handleDurationChange}
		disabled={isRunning}
		class="slider"
		style="--slider-progress: {duration}%"
	/>

	<div class="timer-display">
		<svg class="progress-circle" viewBox="0 0 200 200">
			<!-- Background circle -->
			<circle
				cx="100"
				cy="100"
				r="85"
				fill="none"
				stroke="#e0e0e0"
				stroke-width="20"
			/>
			<!-- Progress circle -->
			<circle
				cx="100"
				cy="100"
				r="85"
				fill="none"
				stroke="#2e7d32"
				stroke-width="20"
				stroke-linecap="round"
				class="progress-bar"
				style="--progress: {duration > 0 ? timeLeft / duration : 0}"
			/>
		</svg>
		<div class="time-text">{timeLeft}</div>
	</div>

	<div class="button-group">
		<button type="button" class="start-button" onclick={start} disabled={isRunning}>
			START
		</button>
		<button type="button" class="stop-button" onclick={stop} disabled={!isRunning}>
			STOP
		</button>
	</div>
</div>

<style>
	.stopwatch-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
		padding: 2rem;
		max-width: 600px;
		margin: 0 auto;
	}

	.duration-control {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		font-size: 1.1rem;
	}

	.duration-control label {
		font-weight: 500;
		color: #333;
	}

	.duration-value {
		font-weight: bold;
		color: #0046ff;
		font-size: 1.3rem;
	}

	.slider {
		width: 100%;
		height: 8px;
		border-radius: 5px;
		background: linear-gradient(to right, #0046ff 0%, #0046ff var(--slider-progress, 60%), #d3d3d3 var(--slider-progress, 60%), #d3d3d3 100%);
		outline: none;
		-webkit-appearance: none;
		appearance: none;
	}

	.slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 24px;
		height: 24px;
		border-radius: 50%;
		background: #0046ff;
		cursor: pointer;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	}

	.slider::-moz-range-thumb {
		width: 24px;
		height: 24px;
		border-radius: 50%;
		background: #0046ff;
		cursor: pointer;
		border: none;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	}

	.slider:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.timer-display {
		position: relative;
		width: 300px;
		height: 300px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.progress-circle {
		width: 100%;
		height: 100%;
		transform: rotate(-90deg);
	}

	.progress-bar {
		stroke-dasharray: 534.07;
		stroke-dashoffset: calc(534.07 * (1 - var(--progress, 1)));
		transition: stroke-dashoffset 0.3s ease;
	}

	.time-text {
		position: absolute;
		font-size: 5rem;
		font-weight: bold;
		color: #0046ff;
		user-select: none;
	}

	.button-group {
		display: flex;
		gap: 1.5rem;
		width: 100%;
		max-width: 500px;
	}

	.start-button,
	.stop-button {
		flex: 1;
		padding: 1rem 2rem;
		font-size: 1.2rem;
		font-weight: bold;
		border-radius: 12px;
		cursor: pointer;
		transition: all 0.2s ease;
		border: 3px solid;
	}

	.start-button {
		background-color: #0046ff;
		color: white;
		border-color: #0046ff;
	}

	.start-button:hover:not(:disabled) {
		background-color: #0039cc;
		border-color: #0039cc;
	}

	.start-button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.stop-button {
		background-color: white;
		color: #0046ff;
		border-color: #0046ff;
	}

	.stop-button:hover:not(:disabled) {
		background-color: #f0f0f0;
	}

	.stop-button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
</style>
