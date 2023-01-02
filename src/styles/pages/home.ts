import { styled } from '..';

export const HomeContainer = styled('main', {
  display: 'flex',
  marginLeft: 'auto',

  width: '100%',
  minHeight: 656
});

export const SliderButton = styled('button', {
  width: '8.5rem',
  height: '100%',
  position: 'absolute',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  background:
    'linear-gradient(90deg, rgba(0, 0, 0, 0.75) 0%, transparent 100%)',

  svg: {
    width: '3rem',
    height: '3rem',
    color: '$gray300',

    transition: 'color 0.2s'
  },

  '&:hover': {
    svg: {
      color: '$gray100'
    }
  },

  '&:disabled': {
    cursor: 'not-allowed',

    svg: {
      opacity: 0.6
    }
  },

  variants: {
    right: {
      true: {
        left: 'auto',
        right: 0,
        background:
          'linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.75) 100%)'
      },
      false: {
        right: 'auto',
        left: 0
      }
    }
  }
});

export const Product = styled('div', {
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: '8px',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  minWidth: '540px',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '&:hover': {
    footer: {
      transform: 'translateY(0%)',
      opacity: 1
    }
  },

  img: {
    objectFit: 'cover',
    width: 'auto',
    height: 'auto'
  }
});

export const ProductFooter = styled('footer', {
  position: 'absolute',
  bottom: '0.25rem',
  left: '0.25rem',
  right: '0.25rem',
  padding: '2rem',

  borderRadius: '6px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  backgroundColor: 'rgba(0, 0, 0, 0.6)',

  transform: 'translateY(110%)',
  opacity: 0,
  transition: 'all 0.2s ease-in-out',

  div: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',

    strong: {
      fontSize: '$lg',
      color: '$gray100'
    },

    span: {
      fontSize: '$xl',
      fontWeight: 700,
      color: '$green300'
    }
  },

  button: {
    width: '3.5rem',
    height: '3.5rem',
    backgroundColor: '$green500',
    borderRadius: 6,

    transition: 'background-color 0.2s',

    '&:hover': {
      backgroundColor: '$green300'
    },

    svg: {
      width: '2rem',
      height: '2rem',
      color: '$white'
    }
  }
});
