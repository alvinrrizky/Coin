import * as React from "react"
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
  Image,
  Text,
  Badge,
  Box,
  Skeleton,
  Spinner
} from '@chakra-ui/react'

const formatNumber = (num) => {
    return Intl.NumberFormat("id-Id").format(num)
  }

const Percentage = ({ percent }) => {
    const numericPercent = parseFloat(percent)
    const formatPercent = Intl.NumberFormat("en-US", {
        style: "percent",
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
    }).format(numericPercent / 100)

    let color = "black"
    if (numericPercent > 0) {
        color = "green.500"
    } else if (numericPercent < 0) {
        color = "red.500"
    }

    return <Text fontWeight={700} color={color}>{formatPercent}</Text>;
};

export default function TableDigitalCoin ({ data, isSuccess, isError, isLoading, isFetching }) {
    return (
        <Box my={10} p={7} border="2px solid #f4f4fc" borderRadius={15}>
            {isFetching && (
                <Spinner color="blue.500" position="fixed" top={10} right={10} />
            )}
            <TableContainer>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>Coin</Th>
                            <Th>Last Price</Th>
                            <Th>24h % Change</Th>
                            <Th isNumeric>Total Volume</Th>
                            <Th isNumeric>Market Cap</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {isLoading && (
                            <Tr>
                                <Td colSpan={5}>
                                    <Skeleton height='30px' />
                                </Td>
                            </Tr>
                        )}
                        {isError && (
                            <Tr>
                                <Td colSpan={5} textAlign="center">
                                    <Text>Fetching was an error processing your request</Text>
                                </Td>
                            </Tr>
                        )}
                        {isSuccess && data?.map(item => (
                            <Tr key={item.id}>
                                <Td>
                                    <Flex alignItems="center">
                                        <Image
                                            src={item.image}
                                            boxSize="24px"
                                            ignoreFallback={true}
                                            alt="Logo of cardano"
                                        />
                                        <Text pl={2} fontWeight="bold" textTransform="capitalize">
                                            {item.name}
                                        </Text>
                                        <Badge ml={3}>{item.symbol}</Badge>
                                    </Flex>
                                </Td>
                                <Td>{formatNumber(item.current_price)}</Td>
                                <Td><Percentage percent={item.price_change_percentage_24h}/></Td>
                                <Td isNumeric>{formatNumber(item.total_volume)}</Td>
                                <Td isNumeric>{formatNumber(item.market_cap)}</Td>
                            </Tr> 
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
        
    )
}