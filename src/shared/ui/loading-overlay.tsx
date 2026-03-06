export const LoadingOverlay = () => {
	return (
		<div className="relative min-h-[100vh] text-center">
			<p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  bg-[var(--main-dark-color)] p-4 rounded-[0.44rem] text-[white] z-20 text-md">
				Loading...
			</p>
		</div>
	)
}
