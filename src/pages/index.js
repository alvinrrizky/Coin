import * as React from "react"
import {
  Box,
  Text,
  Heading,
  Container,
  VStack,
  HStack,
  Button
} from "@chakra-ui/react"
import TableDigitalCoin from "./components/TableDigitalCoin"
import { useQuery, QueryClient } from "react-query"
import { dehydrate } from "react-query/hydration"
import { fetchingMarket } from "./api/apis"

const getMarket = async (page = 1) => {
  const response = fetchingMarket(page)
  return response 
}

// SSR use Hydrate
export async function getStaticProps() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(["market", 1],() => getMarket())

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}

export default function Home() {
  const [page, setPage] = React.useState(1)
  const { data, isError, isLoading, isFetching, isSuccess } = useQuery(["market", page], () => getMarket(page), {
    refetchInterval: 3000
  })

  const nextPage = () => {
    setPage((old) => old + 1)
  }
  
  const previousPage = () => {
    setPage((old) => old - 1)
  }

  return (
    <VStack align="normal" justifyContent="space-between" minH="100vh">
      <Box>
        <Container maxW="-moz-fit-content">
          <Box p={5}>
            <Text fontSize="40px" fontWeight={700}>Coin<Text as="span" color="yellow.400">.</Text></Text>
          </Box>
        </Container>
        <Container maxW="90%">
          <VStack align="flex-start" gap={3} py={7}>
            <Heading fontWeight={100} fontSize="6xl">Let&#39;s See Your Coin In My Wallet</Heading> 
            <Text fontWeight={700}>Project for implementation React Query with NextJS, ReactJS and Chakra UI</Text>
          </VStack>
          <TableDigitalCoin data={data} isSuccess={isSuccess} isError={isError} isLoading={isLoading} isFetching={isFetching}/>
          <HStack justifyContent="end" gap={6} mt={5}>
            <Button
                onClick={previousPage}
                isDisabled={page === 1}
            >Prev</Button>
            <Text>{page}</Text>
            <Button
                onClick={nextPage}
            >Next</Button>
          </HStack>
        </Container>
      </Box>
      <Box as="footer" bg="#00002B" textAlign="center" p={3}>
        <Text color="white" fontWeight={700}>Copyright &copy; By Alvin Andrian Rizki</Text>
      </Box>
    </VStack>
  )
}
