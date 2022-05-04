import { Box, Button } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { SearchTargets } from '../../pages/search'

type LinkButtonProps = {
  choice: string
  setTarget: (target: any) => void
  target: string
}

const LinkButton = ({ choice, setTarget, target }: LinkButtonProps) => {
  return (
    <Button
      _hover={{ color: '#323ebe', bg: '#e2e4e6' }}
      bg={choice === target ? '#f5f6f7' : 'transparent'}
      width="14rem"
      padding="8px"
      fontWeight="normal"
      justifyContent="flex-start"
      onClick={() => {
        setTarget(choice)
      }}
    >
      {choice}
    </Button>
  )
}

const SearchTargetMenu = ({ target, setTarget }: SearchSideBarProps) => {
  const choices = ['posts', 'users']
  return (
    <Box as="nav">
      {choices.map((choice) => {
        return (
          <LinkButton
            key={choice}
            choice={choice}
            setTarget={setTarget}
            target={target}
          />
        )
      })}
    </Box>
  )
}

interface SearchSideBarProps {
  target: string
  setTarget: (target: string) => void
}

const SearchSideBar = ({ target, setTarget }: SearchSideBarProps) => {
  return (
    <Box as="aside">
      <SearchTargetMenu target={target} setTarget={setTarget} />
    </Box>
  )
}

export default SearchSideBar

