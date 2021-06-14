import { Box, Flex, Text, Avatar } from '@chakra-ui/react';

interface ProfileProps {
  showProfileData: boolean;
}

export const Profile: React.FC<ProfileProps> = ({ showProfileData = true }) => {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Lucas Basso</Text>
          <Text color="gray.300" fontSize="small">
            lucas.rbasso@outlook.com
          </Text>
        </Box>
      )}
      <Avatar size="md" name="Lucas Basso" />
    </Flex>
  );
};
