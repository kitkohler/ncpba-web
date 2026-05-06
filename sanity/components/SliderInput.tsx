import { Stack, Flex, Text } from "@sanity/ui";
import { set, NumberInputProps } from "sanity";

export function SliderInput(props: NumberInputProps) {
  const { value = 50, onChange, readOnly } = props;

  return (
    <Stack space={3} padding={1}>
      <Flex align="center" gap={3}>
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={value}
          disabled={readOnly}
          style={{ flex: 1 }}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const val = parseFloat(event.currentTarget.value);
            if (!isNaN(val)) onChange(set(val));
          }}
        />
        <Text size={1} style={{ minWidth: "2.5rem", textAlign: "right" }}>
          {value}%
        </Text>
      </Flex>
    </Stack>
  );
}
