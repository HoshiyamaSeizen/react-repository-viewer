interface Props {
	current: number;
	total: number;
	onPageChange: (target: number) => void;
}

const Paginator = ({ current, total, onPageChange }: Props) => {
	return (
		<div>
			<button onClick={() => onPageChange(current - 1)} disabled={current <= 1}>
				Prev
			</button>
			<button>
				{current}/{total}
			</button>
			<button onClick={() => onPageChange(current + 1)} disabled={current + 1 > total}>
				Next
			</button>
		</div>
	);
};

export default Paginator;
