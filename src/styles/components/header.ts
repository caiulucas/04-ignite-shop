import { styled } from '..';

export const HeaderContainer = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: '73.75rem',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  button: {
    position: 'relative',
    width: '3rem',
    height: '3rem',
    backgroundColor: '$gray800',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 6,

    svg: {
      width: '1.5rem',
      height: '1.5rem',
      color: '$gray300'
    },

    span: {
      position: 'absolute',
      right: '-0.5rem',
      top: '-0.5rem',
      width: '1.5rem',
      height: '1.5rem',
      borderRadius: '1.5rem',
      backgroundColor: '$green500',
      color: '$white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontWeight: 700,
      borderWidth: 3,
      borderStyle: 'solid',
      borderColor: '$gray900'
    }
  }
});
