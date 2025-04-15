import { render } from '@testing-library/react';
import Card from './Card';

describe('Card Component', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <Card>
        <p>Test Content</p>
      </Card>,
    );
    expect(getByText('Test Content')).toBeInTheDocument();
  });

  it('applies additional className correctly', () => {
    const { container } = render(
      <Card className="custom-class">
        <p>Test Content</p>
      </Card>,
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
