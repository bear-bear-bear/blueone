import { Divider, FormInstance, Select, Tooltip } from 'antd';
import type { WorkAddFormValues } from '@/app/contractor/works/add-form.component';
import { Me } from '@/entities/me';
import { useFetchSubcontractors } from '@/features/contractor/subcontractor/list';
import type { User } from '@/shared/api/types';
import processPhoneNumber from '@/shared/lib/utils/process-phone-number';
import { WarningOutlined } from '@ant-design/icons';

type Props = {
  form: FormInstance<WorkAddFormValues>;
  defaultValue?: WorkAddFormValues['userId'];
  disabled?: boolean;
};

export default function SubcontractorSelector1({ form, defaultValue, disabled = false }: Props) {
  const { data: subcontractors, isPending } = useFetchSubcontractors();
  const isDeleted = (() => {
    if (typeof defaultValue === 'undefined' || isPending) {
      return false;
    }
    return !subcontractors?.some((subcontractor) => subcontractor.id === defaultValue);
  })();

  const handleSelect = (v: number) => {
    form.setFieldsValue({ userId: v });
  };

  const handleClear = () => {
    form.setFieldsValue({ userId: undefined });
  };

  return (
    <Select<User['id']>
      placeholder={isDeleted ? '(삭제된 기사가 배정되어 있습니다)' : '업무를 배정받을 기사 선택'}
      status={isDeleted ? 'error' : undefined}
      showSearch
      optionFilterProp="children"
      onSelect={handleSelect}
      onClear={handleClear}
      allowClear
      defaultValue={defaultValue}
      disabled={disabled}
      loading={isPending}
    >
      {subcontractors?.map((subcontractor) => {
        const insuranceInfo = Me.insuranceInfo(subcontractor);

        return (
          <Select.Option key={subcontractor.id} value={subcontractor.id} className="text-center">
            {insuranceInfo.state === 'nearExpiration' && (
              <>
                <Tooltip title={`보험 일자 만료 ${insuranceInfo.from}`}>
                  <WarningOutlined className="text-yellow-500" />
                </Tooltip>
                <Divider type="vertical" />
              </>
            )}
            {insuranceInfo.state === 'expired' && (
              <>
                <Tooltip title={`보험 일자 만료됨`}>
                  <WarningOutlined className="text-red-500" />
                </Tooltip>
                <Divider type="vertical" />
              </>
            )}

            {subcontractor.UserInfo.realname}
            <Divider type="vertical" />
            {processPhoneNumber(subcontractor.phoneNumber)}
          </Select.Option>
        );
      })}
    </Select>
  );
}
