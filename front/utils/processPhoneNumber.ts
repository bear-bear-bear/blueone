import type { User } from '@typings';

export default function processPhoneNumber(phoneNumber: User['phoneNumber']) {
  return phoneNumber.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
}
