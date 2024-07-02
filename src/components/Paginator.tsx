interface Props {
	current: number;
	total: number;
	onPageChange: (target: number) => void;
}

const Paginator = ({ current, total, onPageChange }: Props) => {
	const buttonList = [];

	for (let i = 1; i <= 10; i++) {
		buttonList.push(
			<button
				key={i}
				onClick={() => onPageChange(i)}
				hidden={total < i}
				disabled={current === i}
			>
				{i}
			</button>
		);
	}

	return <div>{buttonList}</div>;
};

export default Paginator;
