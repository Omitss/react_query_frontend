import React from 'react'
import styled from 'styled-components';
import { useDashBoard } from '../../no3_store/hooks/useDashboard';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js"

import { Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
    const {kpi, userRanking, productRanking} = useDashBoard();

    const userChartData = {
        labels : userRanking.map(item=>item.name),
        datasets : [
            {
                label : "구매건수",
                data : userRanking.map(item=>item.count)
            }
        ]
    }

    const productChartData = {
        labels : productRanking.map(item=>item.name),
        datasets : [
            {
                label : "판매수량",
                data : productRanking.map(item=>item.quantity)
            }
        ]
    }

    const chartOptions = {
        responsive : true,
        maintainAspectRatio : false,
        indexAxis : "y",
        plugins : {
            legend : {
                position : "top"
            }
        }
    }

   return (
    <Container>

      <KpiSection>

        <KpiCard>
            <KpiTitle>총 매출액</KpiTitle>
            <KpiValue>
              {kpi.totalSalesAmount.toLocaleString()}원
            </KpiValue>
        </KpiCard>

        <KpiCard>
            <KpiTitle>총 판매수량</KpiTitle>
            <KpiValue>
              {kpi.totalQuantity.toLocaleString()}개
            </KpiValue>
        </KpiCard>

        <KpiCard>
            <KpiTitle>총 주문건수</KpiTitle>
            <KpiValue>
              {kpi.totalOrderCount.toLocaleString()}건
            </KpiValue>
        </KpiCard>

        <KpiCard>
            <KpiTitle>고객 수</KpiTitle>
            <KpiValue>
              {kpi.customerCount.toLocaleString()}명
            </KpiValue>
        </KpiCard>

        <KpiCard>
            <KpiTitle>상품 수</KpiTitle>
            <KpiValue>
              {kpi.productCount.toLocaleString()}개
            </KpiValue>
        </KpiCard>

      </KpiSection>

      <ChartSection>

        <ChartCard>
            <ChartTitle>
              고객 구매 랭킹 TOP 10
            </ChartTitle>

            <ChartWrapper>
              <Bar
                data={userChartData}
                options={chartOptions}
              />
            </ChartWrapper>
        </ChartCard>

        <ChartCard>
            <ChartTitle>
              상품 판매 랭킹 TOP 10
            </ChartTitle>

            <ChartWrapper>
              <Bar
                data={productChartData}
                options={chartOptions}
              />
            </ChartWrapper>
        </ChartCard>

      </ChartSection>

    </Container>
   )
}

export default Dashboard;


/* ===========================
   Styled Components
=========================== */

const Container = styled.div`
  padding: 30px;
  background: #f5f7fb;
  min-height: 100vh;
`;

const KpiSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const KpiCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);

  transition: 0.2s ease;

  &:hover {
    transform: translateY(-3px);
  }
`;

const KpiTitle = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
`;

const KpiValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #222;
`;

const ChartSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
`;

const ChartTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #222;
`;

const ChartWrapper = styled.div`
  height: 450px;
`;