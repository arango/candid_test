import { render, screen, fireEvent } from "@testing-library/react";
import RepoCard from "./index";

const data = {
	id: 1,
	name: "name",
	svn_url: "svn_url",
	stargazers_count: 10000
};

const makeSut = (props) => {
	return render(<RepoCard repo={data} showCommits={jest.fn()} {...props} />);
};

describe("<RepoCard />", () => {
	test("Should contain names", () => {
		const { container } = makeSut({});

		expect(
			container.querySelector(`[data-testid="repo-name"]`)
		).toBeInTheDocument();
	});
	test("Should format numbers correctly", () => {
		const { container } = makeSut({});

		expect(
			container.querySelector(`[data-testid="repo-star-count"]`)
		).toHaveTextContent("10,000");
	});
	test("Click event should be attached", () => {
		const showCommits = jest.fn();

		const { container } = makeSut({ showCommits });

		fireEvent.click(
			container.querySelector(`[data-testid="repo-commits-button"]`)
		);

		expect(showCommits).toHaveBeenCalled();
	});
});
