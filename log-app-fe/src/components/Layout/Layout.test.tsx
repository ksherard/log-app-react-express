import { render } from '@testing-library/react';
import Layout from './Layout';

describe('Layout Component', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <Layout>
        <p>Test Child</p>
      </Layout>,
    );
    expect(getByText('Test Child')).toBeInTheDocument();
  });

  it('applies container and grid styles correctly', () => {
    const { container } = render(
      <Layout>
        <p>Test Child</p>
      </Layout>,
    );
    const layoutDiv = container.firstChild;
    expect(layoutDiv).toHaveClass('container mx-auto p-4');
    expect(layoutDiv?.firstChild).toHaveClass(
      'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4',
    );
  });

  it('stacks items vertically in mobile view', () => {
    const { container } = render(
      <Layout>
        <p>Item 1</p>
        <p>Item 2</p>
      </Layout>,
    );
    const gridDiv = container.querySelector('.grid');
    expect(gridDiv).toHaveClass('grid-cols-1');
  });

  it('applies grid styles for medium screens', () => {
    const { container } = render(
      <Layout>
        <p>Item 1</p>
        <p>Item 2</p>
      </Layout>,
    );
    const gridDiv = container.querySelector('.grid');
    expect(gridDiv).toHaveClass('sm:grid-cols-2');
  });

  it('applies grid styles for large screens', () => {
    const { container } = render(
      <Layout>
        <p>Item 1</p>
        <p>Item 2</p>
        <p>Item 3</p>
      </Layout>,
    );
    const gridDiv = container.querySelector('.grid');
    expect(gridDiv).toHaveClass('lg:grid-cols-3');
  });
});
