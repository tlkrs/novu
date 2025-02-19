import { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { Skeleton } from '@mantine/core';

import { IExtendedCellProps } from './Table';
import { Renderer } from 'react-table';

export const SkeletonStyled = styled(Skeleton)`
  width: 100%;
`;

export const withCellLoading = <T extends object = {}>(
  Component: Renderer<IExtendedCellProps<T>>,
  { width = 100, height = 20 }: { width?: number; height?: number } = {}
) => {
  const displayName =
    typeof Component === 'function' ? (Component as React.ComponentType).displayName || Component.name : 'Component';

  const CellLoading = ({ isLoading, ...rest }: IExtendedCellProps<T>) => {
    if (isLoading) {
      return <SkeletonStyled width={width} height={height} />;
    }

    if (typeof Component === 'function') {
      return <Component isLoading={isLoading} {...rest} />;
    }

    return Component;
  };

  CellLoading.displayName = `withCellLoading(${displayName})`;

  return CellLoading;
};
