'use strict';

module.exports.getAllChats = `

SELECT 
	* 
FROM
(
	SELECT 
		CASE
			WHEN "fromId" = :userId THEN "toId"
			WHEN "toId" = :userId THEN "fromId"
		END AS "chatWithUserId",
		"fromId" AS "lastMessagefromId",
		"text",
		"createdAt" AS "messageCreatedAt"
	FROM
	    (
		SELECT 
		    MAX(id) as "lastMessageId",
		    CASE
			WHEN "fromId" <= "toId" THEN ("fromId"::text || '.' || "toId"::text)
			WHEN "fromId" > "toId" THEN ("toId"::text || '.' || "fromId"::text)
		    END AS "ChatId"
		FROM 
		    public.messages
		WHERE
		    "fromId" = :userId 
		    OR 
		    "toId" = :userId
		GROUP BY "ChatId"
	    ) AS "chats"

	JOIN  public.messages ON id = "lastMessageId"
) AS "chats"

JOIN public.users ON id = "chatWithUserId"
ORDER BY "messageCreatedAt" DESC

`;