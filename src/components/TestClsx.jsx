import clsx from "clsx";

export default function Button({
	isActive,
	isDisabled = false,
	children = "Click!!",
	...props
}) {
	return (
		<button
			className={clsx("py-2 px-4 rounded", {
				"bg-blue-500 text-white": isActive,
				"bg-gray-300 text-gray-700": !isActive,
				"opacity-50 cursor-not-allowed": isDisabled,
			})}
			disabled={isDisabled}
			{...props}
		>
			{children}
		</button>
	);
}
