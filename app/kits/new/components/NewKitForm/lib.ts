import { MAXIMUM_TAGS } from '@/lib/constants';
import { TagsField } from './types';

export const handleTagsKeyDown = (field: TagsField) => (e: React.KeyboardEvent<HTMLInputElement>) => {
  e.currentTarget.setCustomValidity(''); // 입력 시 유효성 초기화
  if (e.key === 'Enter') {
    // Enter 키 입력 시 태그 추가
    if (e.nativeEvent.isComposing) return; // 한글 등 조합글자 입력 시 무시
    e.preventDefault(); // form 제출 방지
    const input = e.currentTarget;
    const tag = input.value.trim();
    // 입력된 값이 없는 경우
    if (tag.length === 0) e.currentTarget.setCustomValidity('태그를 입력해주세요.');
    // 입력된 값이 패턴과 일치하지 않는 경우
    if (input.validity.patternMismatch) e.currentTarget.setCustomValidity('태그는 공백 없이 2~10자로 입력해주세요.');
    // 입력된 값이 이미 추가된 태그인 경우
    if (field.fields.some((field) => field.name === tag)) e.currentTarget.setCustomValidity('이미 추가된 태그입니다.');
    // 입력된 태그가 최대 개수를 초과한 경우
    if (field.fields.length >= MAXIMUM_TAGS) e.currentTarget.setCustomValidity(`태그는 최대 ${MAXIMUM_TAGS}개까지 추가할 수 있습니다.`);
    // 입력된 값이 유효하지 않는 경우 검사 결과 출력
    if (input.validity.valid === false) return e.currentTarget.reportValidity();
    // 입력된 값이 유효한 경우
    field.append({ name: tag }); // 입력된 값 태그로 추가
    input.value = ''; // 입력된 값 초기화
  }
};