-- id, shiftID, storeID,   dropper_userID, pickup_userID, approved, status  created_at, last_updated


create table if not exists `shift_requests` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `shiftID` int(11) NOT NULL,
    `storeID` int(11) NOT NULL,
    `dropper_userID` int(11) NOT NULL,
    `pickup_userID` int(11) NOT NULL,
    `approved` tinyint(1) NOT NULL DEFAULT '0',
    `status` tinyint(1) NOT NULL DEFAULT '0',
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `last_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
)
