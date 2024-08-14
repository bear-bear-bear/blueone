import { Dispatch, SetStateAction, useCallback } from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { DateRange } from '@/shared/api/types';
import { css, Global } from '@emotion/react';

const { RangePicker: RangePickerComponent } = DatePicker;

type Props = {
  dateRange: DateRange;
  setDateRange: Dispatch<SetStateAction<DateRange>>;
};

export default function CustomRangePicker({ dateRange, setDateRange }: Props) {
  const today = dayjs();

  const handleChange = useCallback(
    (_: unknown, [startDate, endDate]: [string, string]) => {
      setDateRange({
        startDate,
        endDate,
      });
    },
    [setDateRange],
  );

  const disabledDate = useCallback(
    (current: dayjs.Dayjs) => {
      if (!current) {
        return false;
      }

      const tooEarly = today.diff(current, 'days') > 100; // 100일 이전
      const tooLate = current > dayjs().endOf('day'); // 오늘 이후

      return tooEarly || tooLate;
    },
    [today],
  );

  return (
    <>
      <Global styles={globalStyles} />

      <RangePickerComponent
        presets={[
          {
            label: '오늘',
            value: [today, today],
          },
          {
            label: '이번 주',
            value: [today.startOf('week'), today],
          },
          {
            label: '이번 달',
            value: [today.startOf('month'), today],
          },
        ]}
        onChange={handleChange}
        defaultValue={[dayjs(dateRange.startDate), dayjs(dateRange.endDate)]}
        disabledDate={disabledDate}
        allowClear={false}
        size="large"
        style={{ width: '100%' }}
      />
    </>
  );
}

const globalStyles = css`
  // range picker 패널 레이아웃을 세로로 변경 - presets을 좌측이 아닌 하단에 표시하기 위함
  .ant-picker-panel-layout {
    display: flex;
    flex-direction: column-reverse;
  }
  .ant-picker-presets {
    width: 100% !important;
    max-width: unset !important;
    > ul {
      display: flex;
      align-items: center;
      height: unset !important;
      padding: unset !important;
      > li {
        flex: 1;
        margin-top: unset !important;
        padding: 10px !important;
        text-align: center;
      }
    }
  }

  // range picker 에서 "다음 달"에 해당하는 패널을 감추기 위한 스타일 - "다음 달" 패널까지 나오면 모바일에서 화면 너비를 넘어감
  .ant-picker-panels > *:first-of-type button.ant-picker-header-next-btn {
    visibility: visible !important;
  }
  .ant-picker-panels > *:first-of-type button.ant-picker-header-super-next-btn {
    visibility: visible !important;
  }
  .ant-picker-panels > *:last-of-type {
    display: none;
  }
  .ant-picker-footer-extra > div {
    flex-wrap: wrap !important;
  }
`;
