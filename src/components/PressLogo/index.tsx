import { useState, useEffect } from 'react'
import * as React from 'react'
import styled from 'styled-components'
import NextImage from 'next/image'
import PlaceHolder from '~/assets/placeholder.png'

const BAD_IMAGES = {}

const Inline = styled.div`
  display: flex;
  align-items: center;
  align-self: center;
`

const Image = styled(NextImage)`
  background-color: white;
  border-radius: 50%;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
`

interface IProps {
  logo: string
  external?: boolean
  size?: number
  style?: React.CSSProperties
}
// next/image won't work, idk why
export default function TokenLogo({
  logo = null,
  external = false /* TODO: temporary fix */,
  size = 24,
  style,
  ...rest
}: IProps) {
  const [error, setError] = useState(false)

  useEffect(() => {
    setError(false)
  }, [logo])

  if (external) {
    return (
      <Inline>
        <Image
          {...rest}
          alt={''}
          src={`/api/image?url=${encodeURIComponent(logo)}`}
          height={size}
          width={size}
          layout="fixed"
        />
      </Inline>
    )
  }

  if (error || BAD_IMAGES[logo]) {
    return (
      <Inline>
        <Image {...rest} alt={''} src={PlaceHolder} height={size} width={size} layout="fixed" />
      </Inline>
    )
  }

  return (
    <Inline style={style}>
      <Image
        {...rest}
        alt={''}
        src={logo}
        height={size}
        width={size}
        layout="fixed"
        onError={(event) => {
          BAD_IMAGES[logo] = true
          setError(true)
          event.preventDefault()
        }}
      />
    </Inline>
  )
}
