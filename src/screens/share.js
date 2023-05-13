import React from "react";
import { Share, Button, View } from "react-native";

const ShareLinkButton = () => {
  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: "Check out this cool link: https://example.com",
        url: "https://example.com",
        title: "Example Website",
      });
      if (result.action === Share.sharedAction) {
        console.log("Link shared successfully");
      } else if (result.action === Share.dismissedAction) {
        console.log("Link sharing dismissed");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View>
      <Button title="Share Link" onPress={handleShare} />
    </View>
  );
};

export default ShareLinkButton;
